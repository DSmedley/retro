import {RetroApi} from './RetroApi';
import {DiscoveryApi, FetchApi} from '@backstage/core-plugin-api';
import {ResponseError} from '@backstage/errors';
import {BoardData, CardData, ColumnData} from '@scrumedley/backstage-plugin-retrospective-common';

export class RetroApiClient implements RetroApi {

  public constructor(
    private readonly discoveryApi: DiscoveryApi,
    private readonly fetchApi: FetchApi
  ) {}

  public async getBoards(): Promise<BoardData[]> {
    return await this.get<BoardData[]>('boards');
  }

  public async getBoard(id: number): Promise<BoardData> {
    return await this.get<BoardData>(`boards/${id}`);
  }

  public async createBoard(board: BoardData): Promise<{ id: number }> {
    return await this.post<{ id: number }>('boards', board);
  }

  public async updateBoard(board: BoardData): Promise<void> {
    return await this.put(`boards/${board.id}`, board);
  }

  public async deleteBoard(id: number): Promise<void> {
    return await this.delete(`boards/${id}`);
  }

  public async archiveRetro(id: number): Promise<{ id: number }> {
    return await this.post<{ id: number }>(`boards/${id}/archive`, {});
  }

  public async getColumns(id: number): Promise<ColumnData[]> {
    return await this.get<ColumnData[]>(`columns/${id}`);
  }

  public async createColumn(column: ColumnData): Promise<{ id: number }> {
    return await this.post<{ id: number }>('columns', column);
  }

  public async updateColumn(column: ColumnData): Promise<void> {
    return await this.put(`columns/${column.id}`, column);
  }

  public async deleteColumn(id: number): Promise<void> {
    return await this.delete(`columns/${id}`);
  }

  public async getCards(id: number): Promise<CardData[]> {
    return await this.get<CardData[]>(`cards/${id}`);
  }

  public async createCard(card: CardData): Promise<{ id: number }> {
    return await this.post<{ id: number }>('cards', card);
  }

  public async updateCard(card: CardData): Promise<void> {
    return await this.put(`cards/${card.id}`, card);
  }

  public async deleteCard(id: number): Promise<void> {
    return await this.delete(`cards/${id}`);
  }

  private async get<T>(path: string): Promise<T> {
    const baseUrl = await this.discoveryApi.getBaseUrl('retrospective');

    const response = await this.fetchApi.fetch(`${baseUrl}/${path}`);

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return await response.json() as Promise<T>;
  }

  private async post<T>(path: string, body: any): Promise<T> {
    const baseUrl = await this.discoveryApi.getBaseUrl('retrospective');

    const response = await this.fetchApi.fetch(`${baseUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return await response.json() as Promise<T>;
  }

  private async put(path: string, body: any): Promise<void> {
    const baseUrl = await this.discoveryApi.getBaseUrl('retrospective');

    const response = await this.fetchApi.fetch(`${baseUrl}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
  }

  private async delete(path: string): Promise<void> {
    const baseUrl = await this.discoveryApi.getBaseUrl('retrospective');

    const response = await this.fetchApi.fetch(`${baseUrl}/${path}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
  }
}