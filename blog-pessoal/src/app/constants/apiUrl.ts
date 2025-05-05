/**
 * URL base da API utilizada pela aplicação para realizar chamadas HTTP.
 * 
 * Esta constante é usada por serviços como PostService, TemaService, etc.,
 * para garantir um único ponto de configuração do endpoint principal.
 * 
 * @example
 * this.httpClient.get(`${API_BASE_URL}/api/postagens`);
 */
export const API_BASE_URL = 'https://blogpessoal-production.up.railway.app';