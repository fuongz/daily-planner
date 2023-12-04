import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class KindeService {
  constructor(private readonly configService: ConfigService) {}
  async validate(token) {
    const getKey = (header: any, callback: any) => {
      const client = jwksClient({
        jwksUri: this.configService.get('KINDE_JWK_URL'),
      });
      client.getSigningKey(header.kid, function (_err, key) {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      });
    };
    return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, {}, (err, payload) => {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
      });
    });
  }
}
