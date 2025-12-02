import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { validateNearbyQuery } from '../../../middleware/validateRequest.js';

describe('validateNearbyQuery Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockRequest = { query: {} };
    mockResponse = { status: statusMock as any, json: jsonMock as any };
    mockNext = jest.fn();
  });

  it('should accept valid coordinates', () => {
    mockRequest.query = { lat: '27.7172', lng: '85.3240', radius: '10' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(mockNext).toHaveBeenCalled();
    expect(statusMock).not.toHaveBeenCalled();
  });

  it('should reject latitude above 90', () => {
    mockRequest.query = { lat: '91', lng: '0', radius: '10' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(mockNext).not.toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      error: 'Invalid coordinates provided',
      message: 'Latitude must be between -90 and 90',
    });
  });

  it('should reject latitude below -90', () => {
    mockRequest.query = { lat: '-91', lng: '0', radius: '10' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should reject longitude above 180', () => {
    mockRequest.query = { lat: '0', lng: '181', radius: '10' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should reject longitude below -180', () => {
    mockRequest.query = { lat: '0', lng: '-181', radius: '10' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should reject radius above 100', () => {
    mockRequest.query = { lat: '27.7172', lng: '85.3240', radius: '101' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should reject negative radius', () => {
    mockRequest.query = { lat: '27.7172', lng: '85.3240', radius: '-1' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should reject missing latitude', () => {
    mockRequest.query = { lng: '85.3240', radius: '10' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should reject missing longitude', () => {
    mockRequest.query = { lat: '27.7172', radius: '10' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should apply default radius when not provided', () => {
    mockRequest.query = { lat: '27.7172', lng: '85.3240' };
    
    validateNearbyQuery(mockRequest as Request, mockResponse as Response, mockNext);
    
    expect(mockNext).toHaveBeenCalled();
  });
});
