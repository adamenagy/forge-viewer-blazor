using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace forge_viewer_blazor_server.Data
{
  public class ForgeTokenService
  {
    public async Task<string> GetForgeTokenAsync()
    {
      var dict = new Dictionary<string, string>();
      dict.Add("client_id", "<client id>>");
      dict.Add("client_secret", "<client secret>");
      dict.Add("grant_type", "client_credentials");
      dict.Add("scope", "viewables:read");
      var response =
        await new HttpClient()
          .PostAsync("https://developer.api.autodesk.com/authentication/v1/authenticate",
          new FormUrlEncodedContent(dict));
      var token = await response.Content.ReadAsAsync<TokenResponse>();

      return token.access_token;
    }
  }

  public class TokenResponse
  {
    public string access_token;
  }
}
