import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default function AccountsUIWrapper() {

    const accountsContainer = useRef()

    // did mount
    const renderLoginButtons = () => {
        this.view = Blaze.render(Template.loginButtons, accountsContainer.current);
    }

    useEffect(() => { renderLoginButtons() }, [renderLoginButtons]);

    // will unmount
    const removeLoginButtons = () => {
        Blaze.remove(this.view);
    }

    useEffect(() => {
        return () => {
            removeLoginButtons()
        }
    }, [removeLoginButtons]);

    // Just render a placeholder container that will be filled in
    return <span ref={accountsContainer} />;

}