import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { errorHandler, notFoundHandler } from '../../../middleware/errorHandler.js';

describe('Error Handler Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockRequest = {};
    mockResponse = { status: statusMock as any, json: jsonMock as any };
    mockNext = jest.fn();
  });

  it('should return 500 error with error message', () => {
    const error = new Error('Test error');

    errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: 'Internal server error',
      message: 'Test error',
    });
  });

  it('should include success false in error response', () => {
    const error = new Error('Another error');

    errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
});

describe('Not Found Handler Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockRequest = { originalUrl: '/api/invalid-route' };
    mockResponse = { status: statusMock as any, json: jsonMock as any };
  });

  it('should return 404 error for invalid routes', () => {
    notFoundHandler(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: 'Not found',
      message: 'Route /api/invalid-route not found',
    });
  });

  it('should include success false in not found response', () => {
    notFoundHandler(mockRequest as Request, mockResponse as Response);

    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
});
