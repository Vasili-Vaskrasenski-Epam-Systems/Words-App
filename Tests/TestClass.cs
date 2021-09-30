using System;
using DAL.Helpers;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class TestClass
    {
        [Test]
        public void MainTest()
        {
            var a = Encrypters.Encrypt("595140502300-0dfj8j89epsbojgt0s9eo7de3u64ctjg.apps.googleusercontent.com");
            var b = Encrypters.Encrypt("LCyn2AEntZ3CwRQkqSzltUer");
            var c = Encrypters.Decrypt("dJVNSEIBRD6j9yn06syKh38FFnQK+ZmZMoIU00yEqNPAj6GgLa7cpyK1AyYgqkin3uZs99S2S7FErWhNlS1gXLSk3OoaJoifS8NvJPwa3Fgs/1uHQ/J5QBq39XtdxGrz00INQsJKzOBrHl69G69k+QFIlWgu7eJzRSosrRVn6S5qWRnZDQYafa0k1ewoZpNsDoEQZ0UfJw/cjDXADzVajFHbR1mbb5k7CU635ssDvW0Q4pZt2IsTduYryi2UJyUjZ2sNrWW71MVCs0/6r2PYAg==");
            var d = Encrypters.Decrypt("Vf0gNDFzON96eMqy7lsZhspXrU4rXXCGrJgw1zkFigWxpz4VzbafWCi4KqxKgdEQU9UQlPQZxWf6q8+QRSzST4CvHJ2D/xbsMYY+u1jnluYyo0skPfyboJJvogqBvVrBEdlepb9lh1euPYHuWOo0lfN78l//aEWy10KrSk3483jynKe0WDdb+Jpl4dzQ5h1hawjO9IEbP5Qc2TDMjvo+iSyH9bqstpuPmmGFcpnGdD8=");
        }
    }
}
