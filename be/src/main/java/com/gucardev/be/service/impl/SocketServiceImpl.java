package com.gucardev.be.service.impl;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gucardev.be.service.SocketService;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/** The type Socket service. */
@Service
@Slf4j
public class SocketServiceImpl implements SocketService {

  private final SocketIOServer server;
  private static final Map<String, String> users = new HashMap<>();

  /**
   * Instantiates a new Socket service.
   *
   * @param server the server
   */
  public SocketServiceImpl(SocketIOServer server) {
    this.server = server;
  }

  @Override
  public void onConnect(SocketIOClient client) {
    String clientId = client.getSessionId().toString();
    log.info("Client connected: {}", clientId);
    users.put(clientId, null);
  }

  @Override
  public void onDisconnect(SocketIOClient client) {
    String clientId = client.getSessionId().toString();
    log.info("Client disconnected: {} ", clientId);
  }

  @Override
  public void onPlayerStateChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {

    log.info("playerStateChange ,client: {}, payload: {}", client.getSessionId(), payload);
    Map<String, Object> response = new HashMap<>();
    response.put("playerState", payload.get("playerState"));
    String jsonPayload = new ObjectMapper().writeValueAsString(response);
    broadcastEvent(client, jsonPayload, "handlePlayerStateChange");
  }

  @Override
  public void onSeekChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {

    log.info("playerStateChange ,client: {}, payload: {}", client.getSessionId(), payload);
    Map<String, Object> response = new HashMap<>();
    response.put("seekTo", payload.get("currentTime"));
    String jsonPayload = new ObjectMapper().writeValueAsString(response);
    broadcastEvent(client, jsonPayload, "handleSeekChange");
  }

  @Override
  public void onVideoIdChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {

    log.info("videoIdChange ,client: {}, payload: {}", client.getSessionId(), payload);
    Map<String, Object> response = new HashMap<>();
    response.put("videoId", payload.get("videoId"));
    String jsonPayload = new ObjectMapper().writeValueAsString(response);

    broadcastEvent(client, jsonPayload, "handleVideoIdChange");
  }

  @Override
  public void onPlaybackRateChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException {

    log.info("onPlaybackRateChange ,client: {}, payload: {}", client.getSessionId(), payload);
    Map<String, Object> response = new HashMap<>();
    response.put("playbackRate", payload.get("playbackRate"));
    String jsonPayload = new ObjectMapper().writeValueAsString(response);

    broadcastEvent(client, jsonPayload, "handlePlaybackRateChange");
  }

  @Override
  public void broadcastEvent(SocketIOClient client, String jsonPayload, String eventName) {

    for (SocketIOClient otherClient : client.getNamespace().getAllClients()) {
      if (!otherClient.getSessionId().equals(client.getSessionId())) {
        log.info("sent to {} ", otherClient.getSessionId());
        otherClient.sendEvent(eventName, jsonPayload);
      }
    }
  }
}
