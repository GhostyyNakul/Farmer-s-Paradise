import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  rainfall: number;
  isMock: boolean;
  location: { lat: number; lng: number };
}

export interface WeatherProvider {
  getWeather(lat: number, lng: number): Promise<WeatherData>;
}

class MockWeatherProvider implements WeatherProvider {
  async getWeather(lat: number, lng: number): Promise<WeatherData> {
    return {
      temperature: 28 + (lat % 5),
      humidity: 55 + (lng % 20),
      condition: 'Partly cloudy',
      windSpeed: 12,
      rainfall: 2.4,
      isMock: true,
      location: { lat, lng },
    };
  }
}

class OpenWeatherProvider implements WeatherProvider {
  constructor(private apiKey: string) {}

  async getWeather(lat: number, lng: number): Promise<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather API request failed');
    const data = (await response.json()) as {
      main: { temp: number; humidity: number };
      weather: { description: string }[];
      wind: { speed: number };
      rain?: { '1h'?: number };
    };
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0]?.description ?? 'Unknown',
      windSpeed: data.wind.speed,
      rainfall: data.rain?.['1h'] ?? 0,
      isMock: false,
      location: { lat, lng },
    };
  }
}

class WeatherService {
  private provider: WeatherProvider;

  constructor() {
    if (env.WEATHER_API_KEY) {
      this.provider = new OpenWeatherProvider(env.WEATHER_API_KEY);
      logger.info('Weather service using OpenWeatherMap');
    } else {
      this.provider = new MockWeatherProvider();
      logger.info('Weather service using mock development data');
    }
  }

  setProvider(provider: WeatherProvider): void {
    this.provider = provider;
  }

  async getWeather(lat: number, lng: number): Promise<WeatherData> {
    try {
      return await this.provider.getWeather(lat, lng);
    } catch (error) {
      logger.warn('Weather provider failed, returning mock data', error);
      return new MockWeatherProvider().getWeather(lat, lng);
    }
  }
}

export const weatherService = new WeatherService();
