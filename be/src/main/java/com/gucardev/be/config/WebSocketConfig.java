package com.gucardev.be.config;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * The type Web socket config.
 */
@Configuration
public class WebSocketConfig {

  @Value("${socket.host}")
  private String host;

  @Value("${socket.port}")
  private int port;

  /**
   * Socket io server socket io server.
   *
   * @return the socket io server
   * @throws Exception the exception
   */
@Bean
  public SocketIOServer socketIOServer() throws Exception {
    com.corundumstudio.socketio.Configuration config =
        new com.corundumstudio.socketio.Configuration();
    config.setHostname(host);
    config.setPort(port);
    return new SocketIOServer(config);
  }
}

