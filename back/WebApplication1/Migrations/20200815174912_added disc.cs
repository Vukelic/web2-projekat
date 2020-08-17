using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class addeddisc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BronzeTier",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "GoldTier",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "SilverTier",
                table: "Discounts");

            migrationBuilder.AddColumn<double>(
                name: "Gold",
                table: "Discounts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "RentAir",
                table: "Discounts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Silver",
                table: "Discounts",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gold",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "RentAir",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "Silver",
                table: "Discounts");

            migrationBuilder.AddColumn<double>(
                name: "BronzeTier",
                table: "Discounts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "GoldTier",
                table: "Discounts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SilverTier",
                table: "Discounts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
