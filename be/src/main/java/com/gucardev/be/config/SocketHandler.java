package com.gucardev.be.config;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gucardev.be.service.SocketService;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SocketHandler {

  private final SocketIOServer server;
  private static final Map<String, String> users = new HashMap<>();
  private final SocketService socketService;

  public SocketHandler(SocketIOServer server, SocketService socketService) {
    this.server = server;
    this.socketService = socketService;
    server.addListeners(this);
    server.start();
  }

  @OnConnect
  public void onConnect(SocketIOClient client) {
    socketService.onConnect(client);
  }

  @OnDisconnect
  public void onDisconnect(SocketIOClient client) {
    socketService.onDisconnect(client);
  }

  @OnEvent("pingg")
  public void onPing(SocketIOClient client) throws JsonProcessingException {
    String clientId = client.getSessionId().toString();
    log.info("ping came from: {} ", clientId);
    client.sendEvent("pongg", new ObjectMapper().writeValueAsString(Map.of("data", "Hello Test!")));
  }

  @OnEvent("videoIdChange")
  public void onVideoIdChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {
    socketService.onVideoIdChange(client, payload);
  }

  @OnEvent("seekChange")
  public void onSeekChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {
    socketService.onSeekChange(client, payload);
  }

  @OnEvent("playerStateChange")
  public void onPlayerStateChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {
    socketService.onPlayerStateChange(client, payload);
  }
}
