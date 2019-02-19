const mongoose = require('mongoose');
const Folder = mongoose.model('Folder');

exports.getAll = async (req, res) => {
    const folders = await Folder.find();

    res.json(folders);
};

exports.get = async (req, res) => {
    const folder = await Folder.find({_id: req.params.id});

    res.json(folder);
};

exports.create = async (req, res) => {
    const folder = await (new Folder(req.body)).save();

    res.json(folder);
};

exports.update = async (req, res) => {
    const folder = await Folder.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true, // return new folder instead of the old one,
        runValidators: true
    }).exec();

    res.json(folder);
};

exports.delete = async (req, res) => {
    const {id = ''} = req.params;

    await Folder.findOneAndRemove({_id: id});

    return res.json(id);
};

exports.bang = async (req, res, next) => {
    await Folder.remove();

    next();
};
