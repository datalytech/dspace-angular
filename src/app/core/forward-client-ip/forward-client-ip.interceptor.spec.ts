import { ForwardClientIpInterceptor } from './forward-client-ip.interceptor';
import { DspaceRestService } from '../dspace-rest/dspace-rest.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';

describe('ForwardClientIpInterceptor', () => {
  let service: DspaceRestService;
  let httpMock: HttpTestingController;

  let requestUrl;
  let clientIp;
  let requestHeaders;

  const configureTestBed = () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DspaceRestService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ForwardClientIpInterceptor,
          multi: true,
        },
        {
          provide: REQUEST,
          useValue: {
            get: (name: string) => requestHeaders[name],
            connection: { remoteAddress: clientIp }
          }
        }
      ],
    });

    service = TestBed.inject(DspaceRestService);
    httpMock = TestBed.inject(HttpTestingController);
  };

  beforeEach(() => {
    requestUrl = 'test-url';
    clientIp = '1.2.3.4';
    requestHeaders = {};
  });

  it('should add an X-Forwarded-For header matching the client\'s IP', () => {
    configureTestBed();

    service.get(requestUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.headers.get('X-Forwarded-For')).toEqual(clientIp);
  });

  it('should forward the client\'s user agent, so the REST API can tell a crawler from a visitor', () => {
    requestHeaders = { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' };
    configureTestBed();

    service.get(requestUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.headers.get('User-Agent')).toEqual('Mozilla/5.0 (compatible; Googlebot/2.1)');
  });

  it('should not set a user agent when the client did not send one', () => {
    configureTestBed();

    service.get(requestUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.headers.has('User-Agent')).toBeFalse();
  });
});
