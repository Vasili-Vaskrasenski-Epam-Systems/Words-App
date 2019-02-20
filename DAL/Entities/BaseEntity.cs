﻿using System;

namespace DAL.Entities
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }
        public byte[] RowVersion { get; set; }
    }
}
