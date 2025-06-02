import { useState } from "react";

type Comment = {
  id: string;
  author: string;
  message: string;
  createdAt: Date;
};

type Props = {
  comments: Comment[];
  onSubmitComment: (text: string) => void;
};

const CommentSection = ({ comments, onSubmitComment }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmitComment(text);
      setText("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-xl font-semibold">Comentarios</h2>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-gray-500">Sé el primero en comentar.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 rounded-xl p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-800">{c.author}</p>
            <p className="text-gray-700 mt-1">{c.message}</p>
            <p className="text-xs text-gray-400 mt-1">
              {c.createdAt.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Campo para escribir comentario */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu comentario..."
          className="w-full rounded-xl border border-gray-300 p-3 resize-none shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
