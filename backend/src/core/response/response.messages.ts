export const RESPONSES = {
  COMMON: {
    API_KEY_REQUIRED: 'Chave de API é obrigatória',
    INVALID_API_KEY: 'Chave de API inválida',
    FORBIDDEN_RESOURCE: 'Recurso não permitido'
  },
  AUTH: {
    AUTHENTICATED_SUCCESSFULLY: 'Usuário foi autênticado com sucesso',
    TOKENS_REFRESHED_SUCCESSFULLY: 'O token de acesso foi restaurado com sucesso',
    INVALID_CREDENTIALS: 'Usuário forneceu credenciais inválidas',
    INVALID_REFRESH_TOKEN: 'Usuário forneceu um refresh token inválido',
  },
  USERS: {
    NOT_FOUND: 'Usuário não encontrado',
    CREATED_SUCCESSFULLY: 'Usuário criado com sucesso',
    UPDATED_SUCCESSFULLY: 'Usuário atualizado com sucesso',
    FETCHED_SUCCESSFULLY: 'Usuários recuperados com sucesso',
    FETCH_BY_ID_SUCCESSFULLY: 'Usuário recuperado com sucesso',
    PASSWORD_MODIFIED_SUCCESSFULLY: 'Usuário alterou a senha com sucesso',
    EMAIL_ALREADY_IN_USE: 'Usuário forneceu um e-mail que já está em uso',
},
  RIDES: {
    NOT_FOUND: 'Carona não encontrado',
    CREATED_SUCCESSFULLY: 'Carona criado com sucesso',
    UPDATED_SUCCESSFULLY: 'Carona atualizada com sucesso',
    FETCHED_SUCCESSFULLY: 'Caronas recuperadas com sucesso',
    FETCH_BY_ID_SUCCESSFULLY: 'Carona recuperada com sucesso',
    DELETED_SUCCESSFULLY: 'Carona deletada com sucesso',
    ARRIVAL_AND_DEPARTURE_TIME_INCONSISTENT: 'Os horários de saída e chegada da carona estão inválidos',
    DRIVER_NOT_FOUND: 'O motorista associado a carona não foi encontrado',
  },

  BOOKINGS: {
    NOT_FOUND: 'Reserva não encontrado',
    CREATED_SUCCESSFULLY: 'Reserva criado com sucesso',
    UPDATED_SUCCESSFULLY: 'Reserva atualizada com sucesso',
    FETCHED_SUCCESSFULLY: 'Reservas recuperadas com sucesso',
    FETCH_BY_ID_SUCCESSFULLY: 'Reserva recuperada com sucesso',
    DELETED_SUCCESSFULLY: 'Reserva deletada com sucesso',
    PASSENGER_NOT_FOUND: 'O passageiro não foi encontrado',
    NO_AVALIABLE_SEATS: 'Não há acentos suficientes na carona',
  },
  
}