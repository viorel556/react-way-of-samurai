import React from "react";
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";


// TESTING A COMPONENT:
// FIXME: DEPRECATED
// describe() takes and runs a suite of tests;
describe('Profile status component', () => {

    test( "status from the posts should be in the state",
        () => {
               const component = create(<ProfileStatus status='it-kamasutra-test-status'/>);
               const instance = component.getInstance();
               expect(instance.status).toBe('it-kamasutra-test-status');
        }
    );

});

