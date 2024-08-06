import {model, Schema} from 'mongoose';

export const BookSchema = new Schema({
    codigo: {type: String, required: true, unique: true},
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    anio: {type: String, required: true},
    descripcion: {type: String, required: true},
    calificacion: {type: Number, default: 3},
    portadaIMG: {type: String, required: true},
    texto: {type: String, required: true},
    ediciones: {type: String, required: true},
    categoria: {type: Array, default: ["Literatura"]},
    copias: {type: Number, default: 1},
    disponibles: {type: Boolean, default: true}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
export const BookModel = model('Book', BookSchema);
