import React from "react";

function AuthForm({ type, children, title }) {
    return (
        <section className="auth">
            <div className={`auth__container auth__container_type_${type}`}>
                <h1 className="auth__title">{title}</h1>
                {children}
            </div>
        </section>
    );
}

export default AuthForm;