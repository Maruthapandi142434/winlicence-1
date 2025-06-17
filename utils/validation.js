export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return {
    isValid: password.length >= 6,
    message: password.length >= 6 ? '' : 'Password must be at least 6 characters'
  };
};

export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return {
    isValid: re.test(username),
    message: re.test(username) ? '' : 'Username must be 3-20 characters and can only contain letters, numbers, and underscores'
  };
};

export const validatePost = (post) => {
  const errors = {};

  if (!post.title?.trim()) {
    errors.title = 'Title is required';
  }

  if (!post.content?.trim()) {
    errors.content = 'Content is required';
  }

  if (post.title?.length > 255) {
    errors.title = 'Title must be less than 255 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 