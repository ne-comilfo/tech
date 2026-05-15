import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import { api } from '../../api/axios';
import './PostDetails.css';

type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      api.get(`/posts/${id}`),
      api.get(`/posts/${id}/comments`)
    ])
      .then(([postRes, commentsRes]) => {
        setPost(postRes.data);
        setComments(commentsRes.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!post) return <Text>Пост не найден</Text>;

  return (
    <div className="details-container">
      <div>
        <Button label="Назад к списку" onClick={() => navigate(-1)} view="ghost" />
      </div>
      
      <div className="details-card">
        <Text size="2xl" weight="bold">{post.title}</Text>
        <Text>{post.body}</Text>
      </div>

      <div className="comments-section">
        <Text size="xl" weight="bold">Комментарии ({comments.length})</Text>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <Text weight="bold" size="s">{comment.name}</Text>
            <Text size="xs" view="ghost" style={{ marginBottom: '8px' }}>{comment.email}</Text>
            <Text>{comment.body}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};