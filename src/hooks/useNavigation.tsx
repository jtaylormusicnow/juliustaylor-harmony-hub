
import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToNextPost = (currentPostIndex: number, posts: any[]) => {
    if (currentPostIndex < posts.length - 1) {
      return currentPostIndex + 1;
    }
    return currentPostIndex;
  };

  const navigateToPrevPost = (currentPostIndex: number) => {
    if (currentPostIndex > 0) {
      return currentPostIndex - 1;
    }
    return currentPostIndex;
  };

  const navigateToCreatePost = () => {
    navigate('/create');
  };

  const navigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const navigateToMessages = () => {
    navigate('/messages');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return {
    navigateToNextPost,
    navigateToPrevPost,
    navigateToCreatePost,
    navigateToProfile,
    navigateToMessages,
    navigateToHome
  };
};
