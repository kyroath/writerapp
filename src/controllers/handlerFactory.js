exports.getAll = Model => async (req, res, next) => {
  const doc = await Model.find();
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc
    }
  });
};

exports.getOne = Model => async (req, res, next) => {
  const doc = await Model.findById(req.params.id);

  if (!doc) {
    return res.status(404).json({
      status: 'fail',
      message: 'No document found with that ID.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
};

exports.createOne = Model => async (req, res, next) => {
  const doc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
};

exports.updateOne = Model => async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true
  });

  if (!doc) {
    return res.status(404).json({
      status: 'fail',
      message: 'No document found with that ID.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
};

exports.deleteOne = Model => async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return res.status(404).json({
      status: 'fail',
      message: 'No document found with that ID.'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};
