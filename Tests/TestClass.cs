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
        }
    }
}
