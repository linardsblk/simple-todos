import React, { useRef, useEffect } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default function AccountsUIWrapper() {

    const accountsContainer = useRef()

    useEffect(() => {
        view = Blaze.render(Template.loginButtons, accountsContainer.current);
        return function removeLoginButtons() {
            Blaze.remove(view);
        };
    });

    


    // Just render a placeholder container that will be filled in
    return <span ref={accountsContainer} />;

}