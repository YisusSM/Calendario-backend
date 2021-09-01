const { body } = require('express-validator');
const Event = require('../models/Event');


const getEvent = async (req, res = express.response) => {

    const events = await Event.find()
        .populate('user', 'name');


    res.json({
        ok: true,
        msg: 'get eventos',
        eventos: events
    });


}

const createEvent = async (req, res = express.response) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const eventSaved = await event.save()

        res.json({
            ok: true,
            msg: 'create eventos',
            evento: eventSaved
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const updateEvent = async (req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene Permisos'
            });
        }
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Event.findByIdAndUpdate(eventId, nuevoEvento, { new: true });
        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }


}
const deleteEvent = async (req, res = express.response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene Permisos'
            });
        }
        await Event.findByIdAndDelete(eventId);
        res.json({
            ok: true,
            msg: 'Evento eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}