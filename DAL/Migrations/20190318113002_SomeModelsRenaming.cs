using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class SomeModelsRenaming : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RelVerbTasks_VerbTasks_VerbTaskId",
                table: "RelVerbTasks");

            migrationBuilder.RenameColumn(
                name: "VerbTaskId",
                table: "RelVerbTasks",
                newName: "TaskVerbId");

            migrationBuilder.RenameIndex(
                name: "IX_RelVerbTasks_VerbTaskId",
                table: "RelVerbTasks",
                newName: "IX_RelVerbTasks_TaskVerbId");

            migrationBuilder.AddForeignKey(
                name: "FK_RelVerbTasks_VerbTasks_TaskVerbId",
                table: "RelVerbTasks",
                column: "TaskVerbId",
                principalTable: "VerbTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RelVerbTasks_VerbTasks_TaskVerbId",
                table: "RelVerbTasks");

            migrationBuilder.RenameColumn(
                name: "TaskVerbId",
                table: "RelVerbTasks",
                newName: "VerbTaskId");

            migrationBuilder.RenameIndex(
                name: "IX_RelVerbTasks_TaskVerbId",
                table: "RelVerbTasks",
                newName: "IX_RelVerbTasks_VerbTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_RelVerbTasks_VerbTasks_VerbTaskId",
                table: "RelVerbTasks",
                column: "VerbTaskId",
                principalTable: "VerbTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
