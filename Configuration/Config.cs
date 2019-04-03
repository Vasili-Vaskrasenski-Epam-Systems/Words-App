using System;

namespace Configuration
{
    public class Config
    {
        public static string WordsDbConnectionStringName;
        public static string AdministratorEmailAddress;
        public static string AdministratorName;
        public static string AdministratorPassword;

        static Config()
        {
            WordsDbConnectionStringName = "WordsDbConnectionString";
            AdministratorEmailAddress = "admin@admin.admin";
            AdministratorName = "Admin";
            AdministratorPassword = "gHyP5kWVjeeMBcHYB64Nqk1RyduyIQvf+F6wX6kgC4PdPpwLdQWsEw8/Re3UmdQrdC1iXnPm5u+386jdXP9amA==";
        }

        public class JwtConstants
        {
            public static string AuthenticationKey;
            public static string SchemaName;
            public static string ValidIssuerName;
            public static string ValidAudienceName;
            public static string AccessTokenExpirationMinutes;
            public static string RefreshTokenExpirationMinutes;
            static JwtConstants()
            {
                AuthenticationKey = "JwtKey";
                SchemaName = "JwtSchemaName";
                ValidIssuerName = "JwtIssuerName";
                ValidAudienceName = "JwtAudienceName";
                AccessTokenExpirationMinutes = "JwtAccessKeyExpirationMinutes";
                RefreshTokenExpirationMinutes = "JwtRefreshKeyExpirationMinutes";
            }
        }

        public class GoogleConstants
        {
            public static string ClientId;
            public static string ClientSecret;

            static GoogleConstants()
            {
                ClientId = "CliendId";
                ClientSecret = "ClientSecret";
            }
        }
    }
}
