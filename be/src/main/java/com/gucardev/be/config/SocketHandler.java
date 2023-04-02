package com.gucardev.be.config;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.AbstractMap;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SocketHandler {

  private final SocketIOServer server;
  private static final Map<String, String> users = new HashMap<>();

  public SocketHandler(SocketIOServer server) {
    this.server = server;
    server.addListeners(this);
    server.start();
  }

  @OnConnect
  public void onConnect(SocketIOClient client) {
    String clientId = client.getSessionId().toString();
    log.info("Client connected: {}", clientId);
    users.put(clientId, null);
  }

  @OnDisconnect
  public void onDisconnect(SocketIOClient client) {
    String clientId = client.getSessionId().toString();
    log.info("Client disconnected: {} ", clientId);
  }

  @OnEvent("pingg")
  public void onPing(SocketIOClient client) throws JsonProcessingException {
    String clientId = client.getSessionId().toString();
    log.info("ping came from: {} ", clientId);
    client.sendEvent(
        "pongg",
        new ObjectMapper()
            .writeValueAsString(new AbstractMap.SimpleEntry<>("data", "Hello Test!")));
  }

  @OnEvent("seekChange")
  public void onSeekChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {
    log.info("playerStateChange ,client: {}, payload: {}", client.getSessionId(), payload);

    Map<String, Object> response = new HashMap<>();
    response.put("seekTo", payload.get("currentTime"));

    String jsonPayload = new ObjectMapper().writeValueAsString(response);

    for (SocketIOClient otherClient : client.getNamespace().getAllClients()) {
      if (!otherClient.getSessionId().equals(client.getSessionId())) {
        otherClient.sendEvent("handleSeekChange", jsonPayload);
      }
    }
  }

  @OnEvent("playerStateChange")
  public void onPlayerStateChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {
    log.info("playerStateChange ,client: {}, payload: {}", client.getSessionId(), payload);

    Map<String, Object> response = new HashMap<>();
    response.put("playerState", payload.get("playerState"));

    String jsonPayload = new ObjectMapper().writeValueAsString(response);

    for (SocketIOClient otherClient : client.getNamespace().getAllClients()) {
      if (!otherClient.getSessionId().equals(client.getSessionId())) {
        otherClient.sendEvent("handlePlayerStateChange", jsonPayload);
      }
    }
  }
}
