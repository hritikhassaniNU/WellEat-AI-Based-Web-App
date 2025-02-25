export const setSuccess = (data, res) => {
  res.status(200);
  res.json(data);
};

export const setFailure = (err, res) => {
  res.status(500).json({
    code: 'Server Error',
    message: err.message,
  });
};
