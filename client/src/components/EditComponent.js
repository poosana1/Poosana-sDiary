import React, { useState, useEffect, useRef } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../services/authorize";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';  // Import styles

const EditComponent = (props) => {
    const [state, setState] = useState({
        title: "",
        content: "",
        author: "",
        slug: ""
    });

    const { title, content, author, slug } = state;

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
        axios.put(`http://localhost:5500/api/blog/${slug}`, { title, content, author }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(response => {
            Swal.fire(
                'Notification',
                'Edit Successfully',
                'success'
            );
            const { title, content, author, slug } = response.data;
            setState({ ...state, title, content, author, slug });
        }).catch(err => {
            alert(err);
        });
    };

    useEffect(() => {
        axios.get(`http://localhost:5500/api/blog/${props.match.params.slug}`).then(response => {
            const { title, content, author, slug } = response.data;
            setState({ ...state, title, content, author, slug });
            if (editor) {
                editor.root.innerHTML = content;
            }
        }).catch(err => alert(err));
    }, [editor]);

    const showUpdatedForm = () => (
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
                <input type="submit" value="UPDATE" className="btn btn-primary" />
            </div>
        </form>
    );

    return (
        <div className="container p-5">
            <NavbarComponent />
            <br />
            <h1 style={{ textAlign: 'center' }}>EDIT YOUR DIARY</h1>
            {showUpdatedForm()}
        </div>
    );
}

export default EditComponent;
