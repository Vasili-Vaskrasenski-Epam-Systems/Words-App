using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IrregularVerbEntity",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(nullable: true),
                    CommonWord = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IrregularVerbEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WordEntity",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(nullable: true),
                    Word = table.Column<string>(nullable: true),
                    Transcription = table.Column<string>(nullable: true),
                    Translation = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordEntity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WordVerbEntity",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    RowVersion = table.Column<byte[]>(nullable: true),
                    WordId = table.Column<Guid>(nullable: false),
                    VerbId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordVerbEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WordVerbEntity_IrregularVerbEntity_VerbId",
                        column: x => x.VerbId,
                        principalTable: "IrregularVerbEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WordVerbEntity_WordEntity_WordId",
                        column: x => x.WordId,
                        principalTable: "WordEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WordVerbEntity_VerbId",
                table: "WordVerbEntity",
                column: "VerbId");

            migrationBuilder.CreateIndex(
                name: "IX_WordVerbEntity_WordId",
                table: "WordVerbEntity",
                column: "WordId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WordVerbEntity");

            migrationBuilder.DropTable(
                name: "IrregularVerbEntity");

            migrationBuilder.DropTable(
                name: "WordEntity");
        }
    }
}
