package com.gucardev.be.service;

import com.corundumstudio.socketio.SocketIOClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Map;

/** The interface Socket service. */
public interface SocketService {

  /**
   * On connect.
   *
   * @param client the client
   */
  void onConnect(SocketIOClient client);

  /**
   * On disconnect.
   *
   * @param client the client
   */
  void onDisconnect(SocketIOClient client);

  /**
   * Broadcast event.
   *
   * @param client the client
   * @param jsonPayload the json payload
   * @param eventName the event name
   */
  void broadcastEvent(SocketIOClient client, String jsonPayload, String eventName);

  /**
   * On player state change.
   *
   * @param client the client
   * @param payload the payload
   * @throws JsonProcessingException the json processing exception
   */
  void onPlayerStateChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException;

  /**
   * On seek change.
   *
   * @param client the client
   * @param payload the payload
   * @throws JsonProcessingException the json processing exception
   */
  void onSeekChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException;

  /**
   * On video id change.
   *
   * @param client the client
   * @param payload the payload
   * @throws JsonProcessingException the json processing exception
   */
  void onVideoIdChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException;

  /**
   * On playback rate change.
   *
   * @param client the client
   * @param payload the payload
   * @throws JsonProcessingException the json processing exception
   */
  void onPlaybackRateChange(SocketIOClient client, Map<String, Object> payload)
      throws JsonProcessingException;

  void joinRoom(SocketIOClient client, Map<String, Object> payload);


//  void putUser(String clientId, String room);
//
//  Map<String, String> removeUser(String clientId, String room);
}
