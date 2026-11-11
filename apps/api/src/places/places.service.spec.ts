import { Test, TestingModule } from '@nestjs/testing';

import { PlacesService } from './places.service.js';

describe('PlacesService', () => {
  let service: PlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacesService],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
  });

  it('loads places from the data file', async () => {
    const places = await service.findAll();

    expect(places.length).toBeGreaterThan(0);
    expect(places[0]).toMatchObject({ id: expect.any(String), name: expect.any(String) });
  });

  it('caches the parsed data across calls', async () => {
    const first = await service.findAll();
    const second = await service.findAll();

    expect(second).toBe(first);
  });
});
