import { Request, Response } from 'express';
import { River } from '../models/River.js';

export const getNearbyRivers = async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    const radius = parseFloat(req.query.radius as string) || 10;

    const radiusInMeters = radius * 1000;

    const rivers = await River.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          distanceField: 'distance',
          maxDistance: radiusInMeters,
          spherical: true,
          distanceMultiplier: 0.001,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          id: { $toString: '$_id' },
          name: 1,
          type: 1,
          distance: { $round: ['$distance', 2] },
          coordinates: '$geometry.coordinates',
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: rivers,
      total: rivers.length,
    });
  } catch (error) {
    console.error('Error fetching nearby rivers:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch nearby rivers',
    });
  }
};
