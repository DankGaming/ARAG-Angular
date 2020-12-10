import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TreeRunComponent } from "./tree-run.component";

describe("TreeRunComponent", () => {
    let component: TreeRunComponent;
    let fixture: ComponentFixture<TreeRunComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TreeRunComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeRunComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
