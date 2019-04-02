using System;
using BL.Infrastructure.Encoders;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class TestClass
    {
        [Test]
        public void MainTest()
        {
            var a = Encrypters.Encrypt("595140502300-1el39f8j0omh96ouevg7blgj5lhels6q.apps.googleusercontent.com");
            var b = Encrypters.Encrypt("qUJ14vUzQOHGJH2A8YgG0DiA");
        }
    }
}
