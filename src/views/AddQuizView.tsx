import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronRight,
  Trash2,
  Plus,
  CheckCircle,
  Check,
  X,
  ChevronDown,
  Info
} from 'lucide-react';

interface QuizQuestionDraft {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const AddQuizView: React.FC = () => {
  const { selectedCourse, setActiveTab, showToast } = useApp();

  const [questions, setQuestions] = useState<QuizQuestionDraft[]>([
    {
      id: 'q-1',
      question: 'Which of these is a sign of duplicate data?',
      options: [
        'The same customer email appears on several rows',
        'Every value in a column is different',
        'Dates are written in one format',
        'Numbers are aligned to the right',
      ],
      correctIndex: 0,
      explanation: 'Duplicate customer emails indicate that transactions or records have repeated entries.',
    },
    {
      id: 'q-2',
      question: 'What is the best way to handle blank cells?',
      options: [
        'Fill them with zeros immediately',
        'Determine whether blanks represent missing data or true zeros',
        'Delete the column',
      ],
      correctIndex: 1,
      explanation: 'Context is essential before deciding whether to impute or drop missing data.',
    },
    {
      id: 'q-3',
      question: 'Which chart suits a trend over time?',
      options: ['Pie chart', 'Line chart', 'Scatter plot', 'Heat map'],
      correctIndex: 1,
      explanation: 'Line charts effectively depict continuous time intervals.',
    },
  ]);

  const [activeQuestionId, setActiveQuestionId] = useState<string>('q-1');
  const [isOptional, setIsOptional] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState('2. Cleaning messy data');
  const [selectedLesson, setSelectedLesson] = useState('Fixing dates and text');

  const handleAddOption = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          options: [...q.options, `New option ${q.options.length + 1}`],
        };
      })
    );
  };

  const handleDeleteOption = (questionId: string, optIndex: number) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id !== questionId) return q;
        if (q.options.length <= 2) {
          showToast('A question requires at least 2 options.');
          return q;
        }
        const newOpts = q.options.filter((_, i) => i !== optIndex);
        return {
          ...q,
          options: newOpts,
          correctIndex: q.correctIndex >= newOpts.length ? 0 : q.correctIndex,
        };
      })
    );
  };

  const handleUpdateOption = (questionId: string, optIndex: number, text: string) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id !== questionId) return q;
        const newOpts = [...q.options];
        newOpts[optIndex] = text;
        return { ...q, options: newOpts };
      })
    );
  };

  const handleSelectCorrect = (questionId: string, optIndex: number) => {
    setQuestions(prev =>
      prev.map(q => (q.id === questionId ? { ...q, correctIndex: optIndex } : q))
    );
  };

  const handleAddQuestion = () => {
    const newId = `q-${Date.now()}`;
    setQuestions(prev => [
      ...prev,
      {
        id: newId,
        question: 'New question',
        options: ['Option 1', 'Option 2'],
        correctIndex: 0,
        explanation: '',
      },
    ]);
    setActiveQuestionId(newId);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (questions.length <= 1) {
      showToast('You must have at least one question.');
      return;
    }
    const filtered = questions.filter(q => q.id !== questionId);
    setQuestions(filtered);
    setActiveQuestionId(filtered[0].id);
  };

  const handleSaveAll = () => {
    showToast('Quiz questions saved successfully');
    setActiveTab('course-workspace');
  };

  return (
    <div className="fade-in page-container">
      {/* Breadcrumb Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          lineHeight: '18px',
          color: 'var(--color-text-secondary)',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={() => setActiveTab('courses')}
          style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontWeight: 500 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          Courses
        </button>
        <ChevronRight size={14} color="var(--color-text-muted)" strokeWidth={1.75} />
        <button
          onClick={() => setActiveTab('course-workspace')}
          style={{ color: 'var(--color-text-secondary)', cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontWeight: 500 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          {selectedCourse?.title || 'Data analysis'}
        </button>
        <ChevronRight size={14} color="var(--color-text-muted)" strokeWidth={1.75} />
        <span style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>Add questions</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Add questions
        </h1>
        <p style={{ fontSize: '14px', lineHeight: '22px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
          Multiple choice only. Learners pick one answer per question. Lesson: Spotting bad data · Cleaning messy data.
        </p>
      </div>

      <div className="course-workspace-grid">
        {/* Left Column: Questions Builder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {questions.map((q, idx) => {
            const isExpanded = activeQuestionId === q.id;

            if (!isExpanded) {
              return (
                <div
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  style={{
                    backgroundColor: 'var(--color-canvas)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg-panel)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-canvas)')}
                >
                  <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {idx + 1}. {q.question || 'Untitled question'}
                  </span>
                  <ChevronDown size={18} color="var(--color-text-secondary)" strokeWidth={1.75} />
                </div>
              );
            }

            return (
              <div
                key={q.id}
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  boxShadow: 'var(--shadow-raised)',
                }}
              >
                {/* Question Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '15px', lineHeight: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Question {idx + 1}
                  </span>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    style={{ color: 'var(--color-border-danger)', cursor: 'pointer', border: 'none', background: 'none' }}
                    title="Delete question"
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </div>

                {/* Question prompt input */}
                <div>
                  <label className="form-label">
                    Question *
                  </label>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const text = e.target.value;
                      setQuestions(prev => prev.map(item => item.id === q.id ? { ...item, question: text } : item));
                    }}
                    className="form-input"
                  />
                </div>

                {/* Answer Options */}
                <div>
                  <label className="form-label">
                    Answer options · <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>select the correct one</span>
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {q.options.map((opt, optIndex) => {
                      const isCorrect = q.correctIndex === optIndex;
                      return (
                        <div
                          key={optIndex}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            border: isCorrect ? '1.5px solid var(--color-action-primary)' : '1px solid var(--color-border)',
                            backgroundColor: isCorrect ? 'var(--color-bg-subtle)' : 'var(--color-canvas)',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={isCorrect}
                            onChange={() => handleSelectCorrect(q.id, optIndex)}
                            style={{ cursor: 'pointer', accentColor: 'var(--color-action-primary)' }}
                          />

                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleUpdateOption(q.id, optIndex, e.target.value)}
                            style={{
                              flexGrow: 1,
                              border: 'none',
                              outline: 'none',
                              backgroundColor: 'transparent',
                              fontSize: '14px',
                              lineHeight: '20px',
                              fontWeight: 500,
                              color: 'var(--color-text-primary)',
                            }}
                          />

                          {isCorrect && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                lineHeight: '18px',
                                fontWeight: 600,
                                color: 'var(--color-status-success-fg)',
                                backgroundColor: 'var(--color-status-success-bg)',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-full)',
                              }}
                            >
                              <Check size={12} strokeWidth={2} color="var(--color-status-success-fg)" />
                              Correct
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeleteOption(q.id, optIndex)}
                            style={{ color: 'var(--color-text-muted)', cursor: 'pointer', border: 'none', background: 'none' }}
                          >
                            <X size={15} strokeWidth={1.75} />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddOption(q.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      lineHeight: '18px',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      marginTop: '12px',
                      cursor: 'pointer',
                      border: 'none',
                      background: 'none',
                    }}
                  >
                    <Plus size={14} strokeWidth={1.75} />
                    Add option
                  </button>
                </div>

                {/* Explanation */}
                <div>
                  <label className="form-label">
                    Explanation · <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>optional</span>
                  </label>
                  <input
                    type="text"
                    value={q.explanation}
                    onChange={(e) => {
                      const text = e.target.value;
                      setQuestions(prev => prev.map(item => item.id === q.id ? { ...item, explanation: text } : item));
                    }}
                    placeholder="Shown to learners after they answer."
                    className="form-input"
                  />
                </div>
              </div>
            );
          })}

          <button
            onClick={handleAddQuestion}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Plus size={16} strokeWidth={1.75} />
            Add another question
          </button>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quiz summary card */}
          <div
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              Quiz summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={16} color="var(--color-success)" strokeWidth={1.75} style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {questions.length} questions
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    Multiple choice, one correct answer each.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={16} color="var(--color-success)" strokeWidth={1.75} style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Every question has a correct answer
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    Select one option per question.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle size={16} color="var(--color-success)" strokeWidth={1.75} style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '13px', lineHeight: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    At least 2 options per question
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Placement card */}
          <div
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Placement
              </h3>
              <p style={{ fontSize: '13px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Choose where learners meet this quiz.
              </p>
            </div>

            <div>
              <label className="form-label">
                After module
              </label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="form-input"
              >
                <option>1. Getting started</option>
                <option>2. Cleaning messy data</option>
                <option>3. Exploring datasets</option>
              </select>
            </div>

            <div>
              <label className="form-label">
                After lesson
              </label>
              <select
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
                className="form-input"
              >
                <option>Spotting bad data</option>
                <option>Removing duplicates</option>
                <option>Fixing dates and text</option>
                <option>Handling blanks</option>
                <option>Cleaning checklist</option>
              </select>
            </div>

            <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-secondary)', display: 'flex', gap: '6px', fontWeight: 500 }}>
              <Info size={14} strokeWidth={1.75} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>The quiz appears right after this lesson in the learner's course path.</span>
            </div>
          </div>

          {/* Quiz settings toggle card */}
          <div
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                Quiz is optional
              </div>
              <div style={{ fontSize: '12px', lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                Learners can skip it and still finish the course.
              </div>
            </div>

            <button
              onClick={() => setIsOptional(prev => !prev)}
              style={{
                width: '42px',
                height: '24px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isOptional ? 'var(--color-action-primary)' : 'var(--color-border)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                border: 'none',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: isOptional ? '20px' : '2px',
                  width: '20px',
                  height: '20px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-canvas)',
                  transition: 'left 0.2s',
                }}
              />
            </button>
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setActiveTab('course-workspace')}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Cancel
            </button>
            <button onClick={handleSaveAll} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              Save questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

