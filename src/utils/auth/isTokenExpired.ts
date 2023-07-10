//import { decode } from 'base-64';
import { Maybe, TokenString } from './types';

const isTokenExpired = (token: string): boolean | null => {
    if (token !== "") {
       // const expiry = JSON.parse(decode(token.split(".")[1])).exp;
        //return Math.floor(new Date().getTime() / 1000) >= expiry;
        return false;
      } else {
        return true;
      }
};