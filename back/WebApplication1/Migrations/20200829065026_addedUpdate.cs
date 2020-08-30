using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class addedUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarCompanuIdId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CarCompanuIdId",
                table: "Reservations",
                column: "CarCompanuIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_CarCompanies_CarCompanuIdId",
                table: "Reservations",
                column: "CarCompanuIdId",
                principalTable: "CarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_CarCompanies_CarCompanuIdId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_CarCompanuIdId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "CarCompanuIdId",
                table: "Reservations");
        }
    }
}
