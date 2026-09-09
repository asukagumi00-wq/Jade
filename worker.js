import { onRequestGet as getConfig } from "./functions/api/config.js";
import {
  onRequestGet as getAdminConfig,
  onRequestPost as postAdminConfig,
  onRequestDelete as deleteAdminConfig
} from "./functions/api/admin/config.js";

function pagesContext(request, env) {
  return {
    request,
    env,
    params: {},
    data: {},
    waitUntil: promise => promise
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";
    const context = pagesContext(request, env);

    if (path === "/api/config" && request.method === "GET") {
      return getConfig(context);
    }

    if (path === "/api/admin/config") {
      if (request.method === "GET") return getAdminConfig(context);
      if (request.method === "POST") return postAdminConfig(context);
      if (request.method === "DELETE") return deleteAdminConfig(context);
    }

    return env.ASSETS.fetch(request);
  }
};
