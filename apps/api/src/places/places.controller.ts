import { Controller, Get } from '@nestjs/common';
import type { Place } from '@milk/domain';

import { PlacesService } from './places.service.js';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  findAll(): Promise<Place[]> {
    return this.placesService.findAll();
  }
}
