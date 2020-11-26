import { patch } from '../src';
import { Types, Document, Schema, model } from 'mongoose';

interface IMyChildObject {
    val1: string;
    val2?: number | null;
    val3?: boolean | null;
}

const MyChildObjectSchema: Schema = new Schema({
    val1: { type: String, required: true },
    val2: { type: Number },
    val3: { type: Boolean }
});

interface IMyObject {
    _id: Types.ObjectId;
    name: string;
    date: Date;
    enabled: boolean;
    optional?: Date | null;
    child?: IMyChildObject | null;
}

const MyObjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    enabled: { type: 'boolean', default: true },
    optional: { type: Date },
    child: { type: MyChildObjectSchema }
});

const MyObject = model<IMyObject & Document>('MyObject', MyObjectSchema);

describe('Tests:', () => {

    test('patches work on mongoose objects', () => {

        const now = new Date();
        const then = new Date(2020, 11, 3);
        const obj = new MyObject();
        obj.name = "my name";
        obj.date = now;
        obj.enabled = true;

        patch(obj, { optional: then });

        expect(obj).toEqual(expect.objectContaining({
            name: "my name",
            date: now,
            enabled: true,
            optional: then
        }));
        expect(obj._id).toBeDefined();
        expect(obj.save).toBeDefined();
        expect(typeof obj.save).toEqual('function');
    });

    test('patches delete from mongoose objects', () => {
        const now = new Date();
        const then = new Date(2020, 11, 3);
        const obj = new MyObject();
        obj.name = "my name";
        obj.date = now;
        obj.enabled = true;
        obj.optional = then;

        patch(obj, { optional: null });

        expect(obj).toEqual(expect.objectContaining({
            name: "my name",
            date: now,
            enabled: true,
            optional: null
        }));
        expect(obj._id).toBeDefined();
        expect(obj.save).toBeDefined();
        expect(typeof obj.save).toEqual('function');
    });

    test('patches work on mongoose child documents', () => {
        const now = new Date();
        const obj = new MyObject();
        obj.name = "my name";
        obj.date = now;
        obj.enabled = true;
        obj.child = {
            val1: "my child"
        }

        patch(obj, {
            child: {
                val2: 451
            }
        });

        expect(obj).toEqual(expect.objectContaining({
            name: "my name",
            date: now,
            enabled: true
        }));
        expect(obj.child).toEqual(expect.objectContaining({
            val1: "my child",
            val2: 451
        }));
        expect(obj._id).toBeDefined();
        expect(obj.save).toBeDefined();
        expect(typeof obj.save).toEqual('function');
    });

    test('patches delete from mongoose child documents', () => {
        const now = new Date();
        const obj = new MyObject();
        obj.name = "my name";
        obj.date = now;
        obj.enabled = true;
        obj.child = {
            val1: "my child",
            val2: 451
        }

        patch(obj, {
            child: {
                val2: null
            }
        });

        expect(obj).toEqual(expect.objectContaining({
            name: "my name",
            date: now,
            enabled: true
        }));
        expect(obj.child).toEqual(expect.objectContaining({
            val1: "my child",
            val2: null
        }));
        expect(obj._id).toBeDefined();
        expect(obj.save).toBeDefined();
        expect(typeof obj.save).toEqual('function');
    });

    test('patches delete mongoose child documents', () => {
        const now = new Date();
        const obj = new MyObject();
        obj.name = "my name";
        obj.date = now;
        obj.enabled = true;
        obj.child = {
            val1: "my child",
            val2: 451,
            val3: true
        }

        patch(obj, { child: null });

        expect(obj).toEqual(expect.objectContaining({
            name: "my name",
            date: now,
            enabled: true,
            child: null
        }));
        expect(obj._id).toBeDefined();
        expect(obj.save).toBeDefined();
        expect(typeof obj.save).toEqual('function');
    });

});
