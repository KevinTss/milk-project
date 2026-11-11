import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { Injectable } from '@nestjs/common';
import type { Place } from '@milk/domain';

const DATA_PATH = fileURLToPath(new URL('../../data/places.json', import.meta.url));

@Injectable()
export class PlacesService {
  private placesPromise: Promise<Place[]> | null = null;

  async findAll(): Promise<Place[]> {
    if (!this.placesPromise) {
      this.placesPromise = readFile(DATA_PATH, 'utf-8').then((raw) => JSON.parse(raw) as Place[]);
    }
    return this.placesPromise;
  }
}
