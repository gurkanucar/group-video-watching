package com.gucardev.be.config;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gucardev.be.service.SocketService;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** The type Socket handler. */
@Component
@Slf4j
public class SocketHandler {

  private final SocketIOServer server;
  private final SocketService socketService;

  /**
   * Instantiates a new Socket handler.
   *
   * @param server the server
   * @param socketService the socket service
   */
  public SocketHandler(SocketIOServer server, SocketService socketService) {
    this.server = server;
    this.socketService = socketService;
    server.addListeners(this);
    server.start();
  }

  /**
   * On connect.
   *
   * @param client the client
   */
  @OnConnect
  public void onConnect(SocketIOClient client) {
    socketService.onConnect(client);
  }

  /**
   * On disconnect.
   *
   * @param client the client
   */
  @OnDisconnect
  public void onDisconnect(SocketIOClient client) {
    socketService.onDisconnect(client);
  }

  /**
   * On ping.
   *
   * @param client the client
   * @throws JsonProcessingException the json processing exception
   */
  @OnEvent("pingg")
  public void onPing(SocketIOClient client) throws JsonProcessingException {
    String clientId = client.getSessionId().toString();
    log.info("ping came from: {} ", clientId);
    client.sendEvent("pongg", new ObjectMapper().writeValueAsString(Map.of("data", "Hello Test!")));
  }

  /**
   * Join room.
   *
   * @param client the client
   * @param payload the payload
   * @throws JsonProcessingException the json processing exception
   */
  @OnEvent("joinRoom")
  public void joinRoom(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {
    socketService.joinRoom(client, payload);
  }

  /**
   * Leave room.
   *
   * @param client the client
   * @param payload the payload
   * @throws JsonProcessingException the json processing exception
   */
  @OnEvent("leaveRoom")
  public void leaveRoom(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {
    socketService.leaveRoom(client, payload);
  }

  /**
   * On player state change.
   *
   * @param client the client
   * @param payload the payload
   * @throws JsonProcessingException the json processing exception
   */
  @OnEvent("playerChange")
  public void onPlayerStateChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {
    socketService.onPlayerStateChange(client, payload);
  }
}
