import React from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDropzone } from 'react-dropzone';
import { serialize } from 'object-to-formdata';

import { useAddAnnouncementMutation } from "../../redux";

const MAX_FILE_SIZE = 2000000;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const schema = yup.object({
    image: yup
        .mixed()
        .test('fileName', 'Image is required', (file) => file.length > 0)
        .test('fileSize', 'File too large', (file) => file[0] && file[0].size <= MAX_FILE_SIZE)
        .test('fileFormat', 'Unsupported file type', (file) => file[0] && SUPPORTED_FORMATS.includes(file[0].type)),
    address: yup.string().min(10).required(),
    description: yup.string().min(20).required(),
    price: yup.number().min(1).required(),
    size: yup.number().min(1).required()
}).required();

export const AddAnnouncementPage = () => {
    const history = useHistory();

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { image: [] }
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: files => {
            console.log(files)
            setValue("image", files);
        }
    });

    const [ addAnnouncement, { isError } ] = useAddAnnouncementMutation();

    if (isError) {
        console.error("Some error");
        history.push('/');
    }

    const onSubmit = async (data) => {
        const formData = serialize(data);
        await addAnnouncement(formData).unwrap();
        history.push('/');
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    {errors.image && <span>{errors.image.message}</span>}
                </div>
                <div>
                    <label htmlFor="address">address</label>
                    <input {...register('address')} type="text" id="address" />
                    {errors.address && <span>{errors.address.message}</span>}
                </div>
                <div>
                    <label htmlFor="description">description</label>
                    <textarea {...register('description')} type="text" id="description"></textarea>
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                <div>
                    <label htmlFor="price">price</label>
                    <input {...register('price')} type="number" id="price" />
                    {errors.price && <span>{errors.price.message}</span>}
                </div>
                <div>
                    <label htmlFor="size">size</label>
                    <input {...register('size')} type="number" id="size" />
                    {errors.size && <span>{errors.size.message}</span>}
                </div>
                <div>
                    <input type="submit" value="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddAnnouncementPage;