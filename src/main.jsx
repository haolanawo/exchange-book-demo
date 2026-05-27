import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpen,
  CheckCircle2,
  Heart,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  X
} from 'lucide-react';
import './styles.css';

const initialBooks = [
  {
    id: 1,
    title: '数据结构 C语言版',
    author: '严蔚敏',
    course: '计算机基础',
    condition: '八成新',
    type: '交换',
    campus: '东区',
    owner: '林同学',
    note: '有少量重点标注，适合期末复习。'
  },
  {
    id: 2,
    title: '高等数学 第七版 上册',
    author: '同济大学数学系',
    course: '公共必修',
    condition: '九成新',
    type: '赠送',
    campus: '北区',
    owner: '陈同学',
    note: '封面干净，习题页没有写答案。'
  },
  {
    id: 3,
    title: '新视野大学英语 读写教程 2',
    author: '郑树棠',
    course: '大学英语',
    condition: '七成新',
    type: '低价出',
    campus: '南区',
    owner: '周同学',
    note: '附课堂笔记，适合补作业和背单词。'
  },
  {
    id: 4,
    title: '微观经济学：现代观点',
    author: '范里安',
    course: '经管课程',
    condition: '九成新',
    type: '交换',
    campus: '西区',
    owner: '许同学',
    note: '想换一本统计学或会计学教材。'
  }
];

const emptyForm = {
  title: '',
  author: '',
  course: '',
  condition: '九成新',
  type: '交换',
  campus: '东区',
  owner: '',
  note: ''
};

function App() {
  const [books, setBooks] = useState(initialBooks);
  const [query, setQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('全部');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [wantedIds, setWantedIds] = useState([2]);
  const [form, setForm] = useState(emptyForm);

  const courses = useMemo(() => ['全部', ...new Set(books.map((book) => book.course))], [books]);
  const types = ['全部', '交换', '赠送', '低价出'];

  const filteredBooks = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchesKeyword =
        !keyword ||
        [book.title, book.author, book.course, book.campus, book.owner].some((value) =>
          value.toLowerCase().includes(keyword)
        );
      const matchesCourse = courseFilter === '全部' || book.course === courseFilter;
      const matchesType = typeFilter === '全部' || book.type === typeFilter;
      return matchesKeyword && matchesCourse && matchesType;
    });
  }, [books, courseFilter, query, typeFilter]);

  const wantedCount = wantedIds.length;

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitBook(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.owner.trim()) {
      return;
    }

    const nextBook = {
      ...form,
      id: Date.now(),
      title: form.title.trim(),
      author: form.author.trim(),
      owner: form.owner.trim(),
      course: form.course.trim() || '通用教材',
      note: form.note.trim() || '发布者暂未补充说明。'
    };

    setBooks((current) => [nextBook, ...current]);
    setForm(emptyForm);
    setCourseFilter('全部');
    setTypeFilter('全部');
    setQuery('');
  }

  function toggleWanted(id) {
    setWantedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function clearSearch() {
    setQuery('');
    setCourseFilter('全部');
    setTypeFilter('全部');
  }

  return (
    <main className="app-shell">
      <section className="topbar" aria-label="站点概览">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <BookOpen size={26} />
          </div>
          <div>
            <p className="eyebrow">Campus Book Swap</p>
            <h1>校园二手书交换站</h1>
          </div>
        </div>
        <div className="quick-stats" aria-label="数据概览">
          <div>
            <span>{books.length}</span>
            <p>在架书籍</p>
          </div>
          <div>
            <span>{wantedCount}</span>
            <p>我想要</p>
          </div>
        </div>
      </section>

      <section className="workspace">
        <aside className="publish-panel" aria-label="发布书籍">
          <div className="panel-title">
            <Sparkles size={20} />
            <h2>发布一本书</h2>
          </div>
          <form onSubmit={submitBook} className="publish-form">
            <label>
              书名
              <input
                value={form.title}
                onChange={(event) => updateForm('title', event.target.value)}
                placeholder="例如：概率论与数理统计"
                required
              />
            </label>
            <label>
              作者 / 版本
              <input
                value={form.author}
                onChange={(event) => updateForm('author', event.target.value)}
                placeholder="作者、出版社或版次"
                required
              />
            </label>
            <label>
              课程分类
              <input
                value={form.course}
                onChange={(event) => updateForm('course', event.target.value)}
                placeholder="公共必修、经管课程等"
              />
            </label>
            <div className="form-grid">
              <label>
                新旧程度
                <select
                  value={form.condition}
                  onChange={(event) => updateForm('condition', event.target.value)}
                >
                  <option>全新</option>
                  <option>九成新</option>
                  <option>八成新</option>
                  <option>七成新</option>
                  <option>可阅读</option>
                </select>
              </label>
              <label>
                方式
                <select value={form.type} onChange={(event) => updateForm('type', event.target.value)}>
                  <option>交换</option>
                  <option>赠送</option>
                  <option>低价出</option>
                </select>
              </label>
            </div>
            <div className="form-grid">
              <label>
                校区
                <select
                  value={form.campus}
                  onChange={(event) => updateForm('campus', event.target.value)}
                >
                  <option>东区</option>
                  <option>南区</option>
                  <option>西区</option>
                  <option>北区</option>
                </select>
              </label>
              <label>
                发布人
                <input
                  value={form.owner}
                  onChange={(event) => updateForm('owner', event.target.value)}
                  placeholder="你的称呼"
                  required
                />
              </label>
            </div>
            <label>
              备注
              <textarea
                value={form.note}
                onChange={(event) => updateForm('note', event.target.value)}
                placeholder="想换什么、取书地点、书况说明..."
                rows="4"
              />
            </label>
            <button className="primary-button" type="submit">
              <Plus size={18} />
              发布书籍
            </button>
          </form>
        </aside>

        <section className="catalog-panel" aria-label="书籍列表">
          <div className="search-row">
            <div className="search-box">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索书名、作者、课程或校区"
              />
              {query && (
                <button className="icon-button" onClick={() => setQuery('')} aria-label="清空搜索">
                  <X size={16} />
                </button>
              )}
            </div>
            <button className="ghost-button" onClick={clearSearch}>
              <SlidersHorizontal size={18} />
              重置筛选
            </button>
          </div>

          <div className="filters" aria-label="筛选条件">
            <label>
              课程
              <select value={courseFilter} onChange={(event) => setCourseFilter(event.target.value)}>
                {courses.map((course) => (
                  <option key={course}>{course}</option>
                ))}
              </select>
            </label>
            <label>
              方式
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                {types.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="result-meta">
            <p>找到 {filteredBooks.length} 本可交换书籍</p>
          </div>

          <div className="book-grid">
            {filteredBooks.map((book) => {
              const isWanted = wantedIds.includes(book.id);
              return (
                <article className="book-card" key={book.id}>
                  <div className="book-cover" aria-hidden="true">
                    <BookOpen size={32} />
                    <span>{book.course.slice(0, 4)}</span>
                  </div>
                  <div className="book-content">
                    <div className="book-head">
                      <div>
                        <p className="book-type">{book.type}</p>
                        <h3>{book.title}</h3>
                      </div>
                      <span className="condition">{book.condition}</span>
                    </div>
                    <p className="author">{book.author}</p>
                    <p className="note">{book.note}</p>
                    <div className="book-footer">
                      <span>{book.campus} · {book.owner}</span>
                      <button
                        className={isWanted ? 'want-button active' : 'want-button'}
                        onClick={() => toggleWanted(book.id)}
                        aria-pressed={isWanted}
                      >
                        {isWanted ? <CheckCircle2 size={18} /> : <Heart size={18} />}
                        我想要
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredBooks.length === 0 && (
            <div className="empty-state">
              <BookOpen size={34} />
              <h3>还没有匹配的书</h3>
              <p>换个关键词或清空筛选，也可以先发布一本同学们会需要的书。</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
