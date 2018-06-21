import passport = require('passport');
import express = require('express');

interface Params {
    [key: string]: any
}

interface Profile extends passport.Profile {
    _raw: string;
    _json: any;
}

interface VerifyOptions {
    message: string;
}

interface VerifyFunction {
    (error: any, user?: any, msg?: VerifyOptions): void;
}

interface IOAuth2StrategyOption {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    authorizationURL?: string;
    tokenURL?: string;
    scopeSeparator?: string;
    lang?: string;
    photoSize?: number;
    profileURL?: string;
    profileFields?: string[];
    apiVersion?: string;
    display?: string;
}

interface IOAuth2StrategyOptionWithRequest extends IOAuth2StrategyOption {
    passReqToCallback: boolean;
}

declare class OAuth2Strategy implements passport.Strategy {
    constructor(
        options: IOAuth2StrategyOption,
        verify: (
            accessToken: string,
            refreshToken: string,
            params: Params,
            profile: Profile,
            done: (error: any, user?: any) => void
        ) => void
    );
    constructor(
        options: IOAuth2StrategyOptionWithRequest,
        verify: (
            req: express.Request,
            accessToken: string,
            refreshToken: string,
            params: Params,
            profile: Profile,
            done: (error: any, user?: any) => void
        ) => void
    );

    name: string;
    authenticate: (req: express.Request, options?: Object) => void;
}