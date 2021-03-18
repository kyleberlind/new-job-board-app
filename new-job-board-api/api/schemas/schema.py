"""03/04/2021"""
import graphene
from sqlalchemy.orm.session import close_all_sessions
from graphene_sqlalchemy import SQLAlchemyObjectType
from ..models.job_posting.job_posting_application_model import JobPostingApplicationModelSQLAlchemy
from ..models.job_posting.job_posting_model import JobPostingModelSQLAlchemy
from ..models.job_posting.job_posting_location_model import JobPostingLocationModelSQLAlchemy
from ..models.job_posting.job_posting_field_mapping_model import JobPostingFieldMappingModel
from ..models.applicant.applicant_info_model import ApplicantInfoModelSQLAlchemy
from ..models.job_posting.job_posting_field_model import JobPostingFieldModelSQLAlchemy
from ..__init__ import db


class JobPostingApplicationObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting application"""
    class Meta:
        """JobPostingApplicationObject meta object"""
        model = JobPostingApplicationModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class ApplicantInfoModelObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting applicant info"""
    class Meta:
        """ApplicantInfoModelObject meta object"""
        model = ApplicantInfoModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class JobPostingModelObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting"""
    class Meta:
        """ApplicantInfoModelObject meta object"""
        model = JobPostingModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class JobPostingLocationModelObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting location info"""
    class Meta:
        """ApplicantInfoModelObject meta object"""
        model = JobPostingLocationModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class JobPostingFieldMappingObject(SQLAlchemyObjectType):
    """GQL Object to represent the mapping between job postings and fields"""

    class Meta:
        """JobPostingFieldMappingObject meta object"""
        model = JobPostingFieldMappingModel


class JobPostingFieldModelObject(SQLAlchemyObjectType):
    """GQL Object to represent the job posting fields"""
    class Meta:
        """ApplicantInfoModelObject meta object"""
        model = JobPostingFieldModelSQLAlchemy
        interfaces = (graphene.relay.Node,)


class UpdateApplicationStatus(graphene.Mutation):
    """Mutation to update the application status"""
    class Arguments:
        """Arguments for UpdateApplicationStatus"""
        employer_reference_id = graphene.String(required=True)
        new_status = graphene.String(required=True)

    job_posting_application = graphene.Field(
        lambda: JobPostingApplicationObject)

    def mutate(self, info, employer_reference_id, new_status):
        """Mutation for updating the application status"""
        applications_query = JobPostingApplicationObject.get_query(info)
        applications_query.filter(
            JobPostingApplicationModelSQLAlchemy.employer_reference_id == employer_reference_id).update({"status": new_status})
        db.session.commit()
        db.session.close()


class Query(graphene.ObjectType):
    """Query object"""
    node = graphene.relay.Node.Field()
    applications_by_employer_id = graphene.List(
        JobPostingApplicationObject, employer_id=graphene.Int())
    applications_by_employer_reference_id = graphene.List(
        JobPostingApplicationObject, employer_reference_id=graphene.String())
    applications_by_employer_applicant_id = graphene.List(
        JobPostingApplicationObject, applicant_id=graphene.Int())

    @staticmethod
    def resolve_applications_by_employer_id(parent, info, **args):
        """Resolves the job posting applications by the employer ID"""
        employer_id = args.get('employer_id')
        applications_query = JobPostingApplicationObject.get_query(info)
        # close the connection to prevent QueryPool Overflow, TODO revisit to see if this is correct
        close_all_sessions()
        return applications_query.filter(
            JobPostingApplicationModelSQLAlchemy.employer_id.contains(employer_id)).all()

    @staticmethod
    def resolve_applications_by_employer_reference_id(parent, info, **args):
        """Resolves the job posting applications by the employer reference ID"""
        employer_reference_id = args.get('employer_reference_id')
        applications_query = JobPostingApplicationObject.get_query(info)
        close_all_sessions()
        return applications_query.filter(
            JobPostingApplicationModelSQLAlchemy.employer_reference_id.contains(
                employer_reference_id
            )
        ).all()

    @staticmethod
    def resolve_applications_by_employer_applicant_id(parent, info, **args):
        """Resolves the job posting applications by the applicant ID"""
        applicant_id = args.get('applicant_id')
        applications_query = JobPostingApplicationObject.get_query(info)
        close_all_sessions()
        return applications_query.filter(
            JobPostingApplicationModelSQLAlchemy.applicant_id.contains(
                applicant_id
            )
        ).all()


class Mutation(graphene.ObjectType):
    update_application_status = UpdateApplicationStatus.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)