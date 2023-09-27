import React, { useState, useEffect, useRef } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { getUser } from "../services/authorize";
import { getToken } from "../services/authorize";
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 

const FormComponent = () => {
    const [state, setState] = useState({
        title: "",
        content: "",
        author: getUser()
    });

    const { title, content, author } = state;

    const quillRef = useRef(null);
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        const quillInstance = new Quill(quillRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }]
                ]
            }
        });
        quillInstance.on('text-change', function () {
            setState(prevState => ({ ...prevState, content: quillInstance.root.innerHTML }));
        });
        setEditor(quillInstance);
    }, []);

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5500/api/create`, { title, content, author }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(response => {
            Swal.fire(
                'Notification',
                'Save Successfully',
                'success'
            );
            setState({ ...state, title: "", content: "", author: "" });
        }).catch(err => {
            Swal.fire('Notification', err.response.data.error, 'error');
        });
    };

    return (
        <div className="container p-5">
            <NavbarComponent />
            <br />
            <h1 style={{ textAlign: 'center' }}>CREATE YOUR NEW DIARY</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")} />
                </div>
                <br />
                <div className="form-group">
                    <label>Details</label>
                    <div ref={quillRef} style={{ height: '200px' }}></div>
                </div>
                <br />
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")} />
                </div>
                <br />
                <div className="form-group text-center">
                    <input type="submit" value="SAVE DIARY" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}

export default FormComponent;
