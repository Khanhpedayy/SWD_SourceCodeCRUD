import { useEffect, useState } from "react";

import {
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
} from "../services/questionService";

const emptyForm = {
    content: "",
    difficulty: "Easy",
    question_type: "Single Choice",
    topic: "General"
};

function QuestionManagement() {
    const [questions, setQuestions] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadQuestions = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getQuestions(search, difficulty);
            setQuestions(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");

            if (editingId) {
                await updateQuestion(editingId, form);
            } else {
                await createQuestion(form);
            }

            resetForm();
            await loadQuestions();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (question) => {
        setEditingId(question.id);
        setForm({
            content: question.content,
            difficulty: question.difficulty,
            question_type: question.question_type,
            topic: question.topic
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmed) return;

        try {
            setError("");
            await deleteQuestion(id);
            await loadQuestions();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        await loadQuestions();
    };

    return (
        <main className="container">
            <header>
                <h1>Quiz Practice System</h1>
                <p>Question Management - CRUD</p>
            </header>

            <section className="card">
                <h2>{editingId ? "Edit Question" : "Create Question"}</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Question
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Enter question..."
                            required
                        />
                    </label>

                    <div className="grid">
                        <label>
                            Difficulty
                            <select
                                name="difficulty"
                                value={form.difficulty}
                                onChange={handleChange}
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </label>

                        <label>
                            Question Type
                            <select
                                name="question_type"
                                value={form.question_type}
                                onChange={handleChange}
                            >
                                <option>Single Choice</option>
                                <option>Multiple Choice</option>
                                <option>True/False</option>
                            </select>
                        </label>

                        <label>
                            Topic
                            <input
                                name="topic"
                                value={form.topic}
                                onChange={handleChange}
                                placeholder="e.g. ReactJS"
                                required
                            />
                        </label>
                    </div>

                    <div className="actions">
                        <button type="submit">
                            {editingId ? "Update Question" : "Create Question"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className="secondary"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="card">
                <div className="toolbar">
                    <form onSubmit={handleSearch} className="search">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search questions..."
                        />

                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="">All difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>

                        <button type="submit">Search</button>
                    </form>
                </div>

                {error && <div className="error">{error}</div>}

                {loading ? (
                    <p>Loading...</p>
                ) : questions.length === 0 ? (
                    <p>No questions found.</p>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Question</th>
                                    <th>Difficulty</th>
                                    <th>Type</th>
                                    <th>Topic</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {questions.map((question) => (
                                    <tr key={question.id}>
                                        <td>{question.id}</td>
                                        <td>{question.content}</td>
                                        <td>{question.difficulty}</td>
                                        <td>{question.question_type}</td>
                                        <td>{question.topic}</td>
                                        <td>
                                            <div className="row-actions">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(question)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="danger"
                                                    onClick={() =>
                                                        handleDelete(question.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default QuestionManagement;
